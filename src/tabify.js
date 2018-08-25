/**                                                              
 * tabify.js
 * @author Wing Kam Wong - wingkwong.code@gmail.com
 * @version - 0.1.0
 */
;
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    var tabify = 'tabify';

    function Tabify(element, o) {
        o = $.extend({}, $.fn[tabify].defaults, o);

        var el = element;
        var $el = $(element);
        var $tabs = $el.find(o.className.tab);
        var $panes = $el.find(o.className.pane);

        function _initTabify() {
             _initializeLayout();
             _initializeEvent();
        }

        function _initializeLayout() {
          $el.find('.tabify-pane:nth-child(' + o.activeTab + ')').addClass('active');

          $tabs.each(function(i){
            $(this).attr('tab-id', (i+1));
          });

          $panes.each(function(i){
            $(this).attr('pane-id', (i+1));
          });

          $tabs.css({
            'width': ( 100 / $tabs.length ) + '%'
          });
        }

        function _initializeEvent() {
          $tabs.click(function(){ 
            $tabs.removeClass('active');
            $panes.removeClass('active');
            $(this).addClass('active');

            $panes
              .filter(function(){
                return $(this).attr('pane-id') == $(this).attr('tab-id');
              })
              .addClass("active");
          });
        }

        //-----------------TABIFY--------------------//

        _initTabify();

        //-----------------TABIFY--------------------//
    }

    $.fn[tabify] = function(o) {
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function() {
                if ($.data(this, 'plugin_' + tabify) && typeof $.data(this, 'plugin_' + tabify)[methodName] === 'function') {
                    returnVal = $.data(this, 'plugin_' + tabify)[methodName].apply(this, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + tabify);
                }
            });
            if (returnVal !== undefined) {
                return returnVal;
            } else {
                return this;
            }
        } else if (typeof o === "object" || !o) {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + tabify)) {
                    $.data(this, 'plugin_' + tabify, new Tabify(this, o));
                }
            });
        }
    };

    $.fn[tabify].defaults = {
      theme: 'tabify-default',
      className: {
        tab: '.tabify-tab',
        pane: '.tabify-pane'
      },
      activeTab: 1,
      colors: {
        activeTabBackgroud: '#ff0000'
      }
    };
}));