export class LoaderService {

    showLoader =() => {
        let loader: any = document.getElementById('loader');
        loader.className = 'block'
        console.log('showLoader', loader)
    }

    hideLoader = () => {
        let loader: any = document.getElementById('loader');
        loader.className = 'hidden'
        console.log('hideLoader', loader)
    }

}