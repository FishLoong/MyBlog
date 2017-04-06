$(function(){
    ModulePackage.styleModule.publishStyle();
    ModulePackage.regexModule.publishReg();
    ModulePackage.pluginModule.buttonModule(ModulePackage.eventModule.openContentEdit)
    ModulePackage.eventModule.activatePlugins();
});
