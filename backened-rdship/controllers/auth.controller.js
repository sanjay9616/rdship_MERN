const { ObjectId } = require("mongodb");
const account = require("../models/user.model");
const product = require("../models/product.model");
const MESSAGE = require("../config/message.config");
const PasswordGenerator = require("../utils/PasswordGenerator");
const Token = require("../utils/TokenUtils")
const UserDetailResponse = require("../dto/response/UserDetailResponse")

exports.getAuthData = (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        account.findOne({ _id: new ObjectId(req.params.id) })
            .then((result) => {
                res.status(200).json({ data: result, status: 200, success: true, message: MESSAGE.SUCCESS.USER_DATA_FETCHED })
            })
            .catch((err) => {
                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
            })
    } else {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_USERID })
    }
}

exports.login = (req, res) => {
    console.log(req.body)
    account.findOne({ email: req.body.email, password: req.body.password })
        .then((result) => {
            // if user is Present than match the encrypted Password
            if (result != null) {
                const matchPassword = PasswordGenerator.matchPassword(req.body.password, result.password)
                if (!matchPassword) {
                    return res.status(400).json({ data: null, status: 400, success: false, message: MESSAGE.ERROR.INVALID_CREDENTIAL })
                }
                const token = Token.generateToken({});
                const response = { ...result, token: token }
                return res.status(200).json({ data: response, status: 200, success: true, message: MESSAGE.SUCCESS.LOGIN_SUCCESSFULL })

            }
            // else user not present
            else {
                return res.status(404).json({ data: result, status: 200, success: true, message: "Incorrect Email Or Password" })
            }
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
        })
}

exports.signUp = (req, res) => {
    console.log(req.body)
    const email = req.body.email.toLowerCase().trim();
    let password = req.body.password;
    const passwordGenerator = new PasswordGenerator();

    passwordGenerator.generateHashPassword(password)
        .then(hash => {
            account.findOne({ email: email })
                .then((result) => {
                    if (result == null) {
                        const user = req.body
                        user.originalPassword = password
                        user.password = hash
                        user.name = null
                        user.gender = null
                        user.isVerified = false
                        user.address = []
                        user.recentlyViewItems = []
                        user.cartItems = []
                        user.orderList = []
                        user.wishList = []
                        user.couponList = []
                        user.notificationList = []
                        account.create(user)
                            .then((result) => {
                                if (result) {
                                    res.status(200).json({ data: result, status: 200, message: MESSAGE.SUCCESS.ACCOUNT_CREATED, success: true })
                                } else {
                                    res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                                }
                            })
                            .catch((err) => {
                                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                            })
                    } else {
                        res.status(409).json({ data: null, status: 409, message: MESSAGE.ERROR.USER_EXITS, success: false })
                    }
                })
                .catch((err) => {
                    res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                })

        })
        .catch((error) => {
            console.error('Error generating hashed password:', error);
        });

}

exports.verifyUser = (req, res) => {
    account.findOne({ email: req.body.email, mobileNo: req.body.mobileNo })
        .then((result) => {
            if (result == null) {
                res.status(401).json({ data: null, status: 401, success: false, message: MESSAGE.ERROR.INVALID_CREDENTIAL })
            } else if (result.isVerified) {
                res.status(409).json({ data: null, status: 409, success: false, message: MESSAGE.ERROR.VERIFIED_USER })
            } else if (result.isVerified == false) {
                account.updateOne({ email: req.body.email, mobileNo: req.body.mobileNo }, { $set: { isVerified: true } })
                    .then((result) => {
                        if (result.acknowledged && result.matchedCount == 1 && result.modifiedCount == 1) {
                            res.status(200).json({ data: result, status: 200, success: true, message: MESSAGE.SUCCESS.VERIFIED_SUCCESSFULL })
                        }
                    })
                    .catch((err) => {
                        res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                    })
            } else {
                res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
            }
        })
        .catch((err) => {
            res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
        })
}

exports.forgetPassword = (req, res) => {
    account.findOne({ email: req.body.email })
        .then((result) => {
            if (result) {
                account.updateOne({ email: req.body.email }, { $set: { password: req.body.password } })
                    .then((result) => {
                        if (result.acknowledged && result.modifiedCount == 1 && result.matchedCount == 1) {
                            res.status(200).json({ data: null, status: 200, success: true, message: MESSAGE.SUCCESS.PASSWORD_UPDATED })
                        } else if (result.acknowledged && result.modifiedCount == 0 && result.matchedCount == 1) {
                            res.status(409).json({ data: null, status: 409, success: false, message: MESSAGE.ERROR.ENTER_NEW_PASSWORD })
                        } else {
                            res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                        }
                    })
                    .catch((err) => {
                        res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                    })

            } else {
                res.status(401).json({ data: null, status: 401, success: false, message: MESSAGE.ERROR.USER_NOT_EXITS })
            }
        })
        .catch((err) => {
            res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
        })
}

exports.updateProfile = (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        account.findOne({ _id: new ObjectId(req.params.id) })
            .then((result) => {
                account.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
                    .then((result) => {
                        if (result.acknowledged && result.matchedCount == 1 && result.modifiedCount == 1) {
                            account.findOne({ _id: new ObjectId(req.params.id) })
                                .then((result) => {
                                    res.status(200).json({ data: result, status: 200, success: true, message: MESSAGE.SUCCESS.PROFILE_UPDATED });
                                })
                                .catch((err) => {
                                    res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                                })
                        } else if (result.acknowledged && result.modifiedCount == 0 && result.matchedCount == 1) {
                            res.status(409).json({ data: null, status: 409, success: false, message: MESSAGE.ERROR.NO_UPDATE })
                        }
                    })
                    .catch((err) => {
                        res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                    })
            })
            .catch((err) => {
                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
            })
    } else {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_USERID })
    }
}

exports.addCartItem = (req, res) => {
    let userId = req.params.id
    if (ObjectId.isValid(userId)) {
        account.findOne({ _id: userId })
            .then((result) => {
                let cartItems = result.cartItems
                let isItemExits = result.cartItems.some((item) => item._id == req.body._id);
                if (isItemExits) {
                    res.status(200).json({ data: cartItems, status: 204, success: true, message: MESSAGE.ERROR.ITEM_EXITS_IN_CART });
                } else {
                    account.updateOne({ _id: userId }, { $push: { cartItems: req.body } })
                        .then((result) => {
                            if (result.acknowledged && result.matchedCount == 1 && result.modifiedCount == 1) {
                                account.findOne({ _id: userId })
                                    .then((result) => {
                                        res.status(200).json({ data: result.cartItems, status: 200, success: true, message: MESSAGE.SUCCESS.ITEM_ADDED_IN_CART })
                                    })
                                    .catch((err) => {
                                        res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                                    })
                            } else {
                                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                            }
                        })
                        .catch((err) => {
                            res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                        })
                }
            })
    } else {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_USERID })
    }

}

exports.addFavoriteItem = (req, res) => {
    let userId = req.params.id
    if (ObjectId.isValid(userId)) {
        account.findOne({ _id: userId })
            .then((result) => {
                let favoriteItems = result.wishList
                let isItemExits = result.wishList.some((item) => item._id == req.body._id);
                if (isItemExits) {
                    res.status(200).json({ data: favoriteItems, status: 204, success: true, message: MESSAGE.ERROR.ITEM_EXITS_IN_FAVORITE });
                } else {
                    account.updateOne({ _id: userId }, { $push: { wishList: req.body } })
                        .then((result) => {
                            if (result.acknowledged && result.matchedCount == 1 && result.modifiedCount == 1) {
                                account.findOne({ _id: userId })
                                    .then((result) => {
                                        res.status(200).json({ data: result.wishList, status: 200, success: true, message: MESSAGE.SUCCESS.ITEM_ADDED_IN_FAVORITE })
                                    })
                                    .catch((err) => {
                                        res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                                    })
                            } else {
                                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                            }
                        })
                        .catch((err) => {
                            res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                        })
                }
            })
    } else {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_USERID })
    }

}

exports.getCartItems = (req, res) => {
    let userId = req.params.id
    if (ObjectId.isValid(userId)) {
        account.findOne({ _id: userId })
            .then((result) => {
                res.status(200).json({ data: result.cartItems, status: 200, success: true, message: MESSAGE.SUCCESS.CART_ITEMS_FETCHED });
            })
            .catch((err) => {
                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
            })
    } else {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_USERID })
    }
}

exports.getFavoriteItems = (req, res) => {
    let userId = req.params.id
    if (ObjectId.isValid(userId)) {
        account.findOne({ _id: userId })
            .then((result) => {
                res.status(200).json({ data: result.wishList, status: 200, success: true, message: MESSAGE.SUCCESS.CART_FAVORITE_FETCHED });
            })
            .catch((err) => {
                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
            })
    } else {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_USERID })
    }
}

exports.deleteCartItem = (req, res) => {
    let userId = req.params.userId
    let itemId = req.params.itemId
    if (!ObjectId.isValid(userId)) {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_USERID })
    } else if (!ObjectId.isValid(userId)) {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_ITEMID })
    } else {
        account.updateOne({ _id: new ObjectId(userId) }, { $pull: { cartItems: { _id: new ObjectId(itemId) } } })
            .then((result) => {
                if (result.acknowledged && result.matchedCount == 1 && result.modifiedCount == 1) {
                    account.findOne({ _id: userId })
                        .then((result) => {
                            res.status(200).json({ data: result.cartItems, status: 200, success: true, message: MESSAGE.SUCCESS.CART_ITEM_DELETED })
                        })
                        .catch((err) => {
                            res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                        })
                } else if (result.acknowledged && result.modifiedCount == 0 && result.matchedCount == 1) {
                    res.status(409).json({ data: null, status: 409, success: false, message: MESSAGE.ERROR.CANNOT_DELETE_CART_ITEM })
                }
            })
            .catch((err) => {
                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
            })
    }
}

exports.deleteFavoriteItem = (req, res) => {
    let userId = req.params.userId
    let itemId = req.params.itemId
    if (!ObjectId.isValid(userId)) {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_USERID })
    } else if (!ObjectId.isValid(userId)) {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_ITEMID })
    } else {
        account.updateOne({ _id: new ObjectId(userId) }, { $pull: { wishList: { _id: itemId } } })
            .then((result) => {
                if (result.acknowledged && result.matchedCount == 1 && result.modifiedCount == 1) {
                    account.findOne({ _id: userId })
                        .then((result) => {
                            res.status(200).json({ data: result.wishList, status: 200, success: true, message: MESSAGE.SUCCESS.FAVORITE_ITEM_DELETED })
                        })
                        .catch((err) => {
                            res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                        })
                } else if (result.acknowledged && result.modifiedCount == 0 && result.matchedCount == 1) {
                    res.status(409).json({ data: null, status: 409, success: false, message: MESSAGE.ERROR.CANNOT_DELETE_FAVORITE_ITEM })
                }
            })
            .catch((err) => {
                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
            })
    }
}

exports.updateCartQty = (req, res) => {
    let userId = req.params.userId
    let itemId = req.params.itemId
    if (!ObjectId.isValid(userId)) {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_USERID })
    } else if (!ObjectId.isValid(userId)) {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_ITEMID })
    } else {
        if (req.body.numberOfItem > 0) {
            account.updateOne({ _id: new ObjectId(userId), "cartItems._id": itemId }, { $set: { "cartItems.$.numberOfItem": req.body.numberOfItem } })
                .then((result) => {
                    if (result.acknowledged && result.matchedCount == 1 && result.modifiedCount == 1) {
                        account.findOne({ _id: userId })
                            .then((result) => {
                                res.status(200).json({ data: result.cartItems, status: 200, success: true, message: MESSAGE.SUCCESS.QUANTITY_UPDATED })
                            })
                            .catch((err) => {
                                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                            })
                    } else if (result.acknowledged && result.modifiedCount == 0 && result.matchedCount == 1) {
                        res.status(409).json({ data: null, status: 409, success: false, message: `Item Quantity Already ${req.body.numberOfItem}.` })
                    }
                })
                .catch((err) => {
                    res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                })
        } else {
            res.status(400).json({ data: null, status: 400, success: false, message: MESSAGE.ERROR.QUANTITY_SHOULD_GREATRER_THEN_ONE })
        }
    }
}

exports.addRecentlyViewItems = (req, res) => {
    let userId = req.params.id
    let itemId = req.body._id;
    if (ObjectId.isValid(userId)) {
        account.findOne({ _id: userId })
            .then((result) => {
                let isItemExits = result.recentlyViewItems.some((item) => item._id == req.body._id);
                if (isItemExits) {
                    account.updateOne({ _id: new ObjectId(userId) }, { $pull: { recentlyViewItems: { _id: itemId } } })
                        .then((result) => {
                            if (result.acknowledged && result.matchedCount == 1 && result.modifiedCount == 1) {
                                account.updateOne({ _id: new ObjectId(userId) }, { $push: { recentlyViewItems: { $each: [req.body], $position: 0 } } })
                                    .then((result) => {
                                        if (result.acknowledged && result.matchedCount == 1 && result.modifiedCount == 1) {
                                            account.findOne({ _id: userId })
                                                .then((result) => {
                                                    res.status(200).json({ data: result.recentlyViewItems, status: 200, success: true, message: MESSAGE.SUCCESS.ITEM_ADDED_IN_RECENT_VIEW })
                                                })
                                                .catch((err) => {
                                                    res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                                                })
                                        } else {
                                            res.status(409).json({ data: null, status: 409, success: false, message: MESSAGE.ERROR.CANNOT_INSERT_IN_RECENT_VIEW })
                                        }
                                    })
                                    .catch((err) => {
                                        res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                                    })
                            } else {
                                res.status(409).json({ data: null, status: 409, success: false, message: MESSAGE.ERROR.CANNOT_DELETE_RECENT_VIEW_item })
                            }
                        })
                        .catch((err) => {
                            res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                        })
                } else {
                    account.updateOne({ _id: new ObjectId(userId) }, { $push: { recentlyViewItems: { $each: [req.body], $position: 0 } } })
                        .then((result) => {
                            if (result.acknowledged && result.matchedCount == 1 && result.modifiedCount == 1) {
                                account.findOne({ _id: userId })
                                    .then((result) => {
                                        res.status(200).json({ data: result.recentlyViewItems, status: 200, success: true, message: MESSAGE.SUCCESS.ITEM_ADDED_IN_RECENT_VIEW })
                                    })
                                    .catch((err) => {
                                        res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                                    })
                            } else {
                                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                            }
                        })
                        .catch((err) => {
                            res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                        })
                }
            })
            .catch((err) => {
                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
            })
    } else {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_USERID })
    }

}

exports.getHomeDetails = (req, res) => {
    let userId = req.params.id
    if (ObjectId.isValid(userId)) {
        account.findOne({ _id: new ObjectId(userId) }).limit(30)
            .then((result) => {
                let recentlyViewItems = result.recentlyViewItems
                product.find().sort({ numberOfSelling: 1 }).limit(30)
                    .then((result) => {
                        res.status(200).json({ data: { recentlyViewItems: recentlyViewItems, topSellingProducts: result }, status: 200, success: true, message: MESSAGE.SUCCESS.HOME_DETAILS_FETCHED })
                    })
                    .catch((err) => {
                        res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
                    })
            })
            .catch((err) => {
                res.status(500).json({ data: null, status: 500, success: false, error: err, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
            })

    } else {
        res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.INVALID_USERID })
    }
}

exports.getUserDetail = (req, res) => {
    // email should be passed in request param
    let email = req.query.email
    account.findOne({ email: email }).then((result) => {
        console.log(result)
        const userDetailResponse = new UserDetailResponse(result)
        return res.status(200).json({ data: userDetailResponse, status: 200, success: false, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })

    })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ data: null, status: 500, success: false, message: MESSAGE.ERROR.SOMETHING_WENT_WRONG })
        })
}

/* Insert Or Update Delivery Address
   * RequestBody :{"email":"" ,"addressDetail": { "addressId":"","state":"","address":"","pincode":"" }}

*/

exports.updateDeliveryAddress = async (req, res) => {
   
    try {
        const email = req.body.email
        const address = req.body.addressDetail;

        let user = await account.findOne({ email: email })
        if(!user){
            return res.status(400).json({data: null, status: 500, success: false, message: "User not found"})
        }
        const currentAddress = user.address!=null ? user.address : [];
        // means address is for update if there is addressId Present in Payload
        let maxId = 0;
         currentAddress.forEach(data=>{
            maxId = Math.max(maxId,data.addressId)
        });

        if(address.addressId!=null && currentAddress!=null && currentAddress.length>0 ){
            currentAddress.forEach((data,index)=>{
              if(data.addressId==address.addressId){
                data.state = address.state;
                data.city = address.city;
                data.address = address.addres;
                data.pincode = address.pincode  
              }
            })
        }
        // its new Address
        else{
            console.log("maxId=",maxId+1)
         const newAddress = {addressId:maxId+1,state:address.state,city:address.city,pincode:address.pincode,address:address.address}
         currentAddress.push(newAddress);
         console.log("newAddress=",newAddress)

        }
        user.address = currentAddress;
        console.log(currentAddress)

       const updatedUser =  await account.findByIdAndUpdate({_id:user._id},user)
       return res.status(200).json({data: updatedUser, status: 200, success: true, message: "address Added SuccessFully"})
        
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({data: null, status: 500, success: false, message: "Something Went Wrong"})

    }

}

