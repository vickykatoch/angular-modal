var modalDemo = angular.module('modalDemo',['vam.modal']);

modalDemo.config(function(vamModelDefaultsProvider) {
    return vamModelDefaultsProvider.set({
        closeButtonHtml: "<i class='fa fa-times'></i>"
    });
});