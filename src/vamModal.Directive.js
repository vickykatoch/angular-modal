(function(){

    'use strict';
    var app = angular.module('vam.modal', []);
    app.provider('vamModelDefaults',function(){
        return {
            options: {
                closeButtonHtml: "<span class='ng-modal-close-x'>X</span>"
            },
            $get: function() {
                return this.options;
            },
            set: function(keyOrHash, value) {
                var k, v, _results;
                if (typeof keyOrHash === 'object') {
                    _results = [];
                    for (k in keyOrHash) {
                        v = keyOrHash[k];
                        _results.push(this.options[k] = v);
                    }
                    return _results;
                } else {
                    return this.options[keyOrHash] = value;
                }
            }
        };
    });

    angular.module('vam.modal').directive('vamModal',['vamModelDefaults', '$sce',function(defaultOptions,$sce){
        return {
            restrict: 'E',
            scope: {
                show: '=',
                dialogTitle: '@',
                onClose: '&?',
                outsideClickHide: '=',
                noClose :'='
            },
            replace: true,
            transclude: true,
            link: function(scope, element, attrs) {
                var setupCloseButton, setupStyle;

                setupCloseButton = function() {
                    if(!scope.noClose)
                        return scope.closeButtonHtml = $sce.trustAsHtml(defaultOptions.closeButtonHtml);
                };
                setupStyle = function() {
                    scope.dialogStyle = {};
                    if (attrs.width) {
                        scope.dialogStyle['width'] = attrs.width;
                    }
                    if (attrs.height) {
                        return scope.dialogStyle['height'] = attrs.height;
                    }
                };

                scope.hideModal = function(overlayTriggered) {
                    if(overlayTriggered) {
                        if(scope.outsideClickHide)
                            return scope.show = false;
                    } else {
                        return scope.show = false;
                    }
                };
                scope.$watch('show', function(newVal, oldVal) {
                    if (newVal && !oldVal) {
                        document.getElementsByTagName("body")[0].style.overflow = "hidden";
                    } else {
                        document.getElementsByTagName("body")[0].style.overflow = "";
                    }
                    if ((!newVal && oldVal) && (scope.onClose != null)) {
                        return scope.onClose();
                    }
                });
                setupCloseButton();
                return setupStyle();
            },
            template : "<div class='vam-modal' ng-show='show'>\n  <div class='vam-modal-overlay' ng-click='hideModal(true)'></div>\n  <div class='vam-modal-dialog' ng-style='dialogStyle'>\n    <span class='vam-modal-title' ng-show='dialogTitle && dialogTitle.length' ng-bind='dialogTitle'></span>\n<div                          class='vam-modal-close' ng-click='hideModal()'>\n      <div ng-bind-html='closeButtonHtml'></div>\n    </div>\n    <div class='vam-modal-dialog-content' ng-transclude></div>\n  </div>\n</div>"
        }; 
    }]);

}).call(this);