export class LoaderService {

    showLoader =() => {
        let loader: any = document.getElementById('loader');
        loader.className = 'block'
    }

    hideLoader = () => {
        let loader: any = document.getElementById('loader');
        loader.className = 'hidden'
    }

}