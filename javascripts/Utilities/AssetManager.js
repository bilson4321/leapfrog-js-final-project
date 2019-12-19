class AssetManager
{
    constructor()
    {
        this.images={};
        this.totalImages=0;
        this.loadedImage=0;
    }
    loadImageAsset(name,source)
    {
        this.totalImages++;
        var ImageAsset=new Image();
        ImageAsset.src=source;
        ImageAsset.addEventListener('load',function(){this.loadedImage++;}.bind(this));
        this.images[name]=ImageAsset;
    }
    getImageAsset(name)
    {
        if(this.images.hasOwnProperty(name))
            return this.images[name];
    }
    displayStatus(canvasContext)
    {
        canvasContext.font = "30px Arial";
        canvasContext.fillText("Loading :",this.loadedImage,'/',this.totalImages, 10, 50);
    }
}
export {AssetManager};