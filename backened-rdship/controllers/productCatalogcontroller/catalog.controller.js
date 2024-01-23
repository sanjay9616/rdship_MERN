const BrandSchema = require("../../models/productcatalogmodel/brandModel")

exports.addBrand = async (req, res) => {

    try {
        const body = req.body;
        // if brand Already Exists Don't add it
        const brand = await BrandSchema.findOne({ brandName: body.brandName.trim() });
        if (brand != null) {
            return res.status(400).json({ message: "Brand Already Present" });
        }
        const brandDocument = await BrandSchema.create({
            brandName: body.brandName.trim(),
            description: body.description,
            active: true,
            images: [...body?.images]
        })
        res.status(201).json({ message: "Brand added successfully", brand: brandDocument });
    }
    catch (err) {
        console.err(err)
        res.status(400).json({ message: "Brand added successfully", brand: brandDocument });
    }
}

/*
   * Update Brand By Id
   
 */
exports.updateBrand = async (req, res) => {

    try {
        const body = req.body;
        // if brand Already Exists Don't add it
        const brand = await BrandSchema.findById(body.brandId)
        if (brand == null) {
            return res.status(400).json({ message: "Brand  Not Present For Update" });
        }
        const newBrandData = {...body}
        let doc = await BrandSchema.updateOne({_id:body.brandId},newBrandData)
        return res.status(201).json({ message: "Brand updated successfully", brand: doc });
    }
    catch (err) {
        console.err(err)
        return res.status(400).json({ message: "Brand added successfully", brand: brandDocument });
    }
}