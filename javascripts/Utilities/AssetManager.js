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
        canvasContext.font = "40px Arial";
        canvasContext.fillText("Loading :",this.loadedImage,'/',this.totalImages, 100, 220);
        console.log("Loading :",this.loadedImage,'/',this.totalImages);
    }
}
export {AssetManager};