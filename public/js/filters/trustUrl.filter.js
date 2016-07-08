/**
 * Created by Raphson on 7/8/16.
 */
app.filter("trustUrl", function($sce){
    return function (recordingUrl){
        return $sce.trustAsResourceUrl(recordingUrl);
    }
})