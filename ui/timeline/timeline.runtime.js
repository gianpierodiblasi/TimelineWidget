/* global TW */
$("head").append('<link href="../Common/extensions/TimelineWidget/ui/timeline/jslibrary/timeline.min.css" rel="stylesheet">');
$("body").append('<script type="text/javascript" src="../Common/extensions/TimelineWidget/ui/timeline/jslibrary/timeline.min.js"></script>');

TW.Runtime.Widgets.timeline = function () {
  var thisWidget = this;
  var uid = new Date().getTime() + "_" + Math.floor(1000 * Math.random());

  this.runtimeProperties = function () {
    return {
      'supportsAutoResize': true,
      'needsDataLoadingAndError': false
    };
  };

  this.renderHtml = function () {
    var html =
            '<div class="widget-content widget-timeline widget-timeline-' + uid + '">' +
            '</div>';
    return html;
  };

  this.afterRender = function () {
  };

  this.resize = function (width, height) {
  };

  this.serviceInvoked = function (serviceName) {
  };

  this.updateProperty = function (updatePropertyInfo) {
    if (updatePropertyInfo.TargetProperty === 'timeline') {
      this.setProperty("timeline", updatePropertyInfo.RawSinglePropertyValue || updatePropertyInfo.RawDataFromInvoke);
      this.initTimeline();
    } else if (updatePropertyInfo.TargetProperty === 'startIndex') {
      this.setProperty("startIndex", updatePropertyInfo.RawSinglePropertyValue || updatePropertyInfo.RawDataFromInvoke);
      this.initTimeline();
    } else {
      this.setProperty(updatePropertyInfo.TargetProperty, updatePropertyInfo.RawSinglePropertyValue || updatePropertyInfo.RawDataFromInvoke);
    }
  };

  this.initTimeline = function () {
    thisWidget.setProperty("selectedIndex", -1);
    thisWidget.setProperty("selectedItem", null);
    thisWidget.updateSelection('timeline', []);

    var widgetDIV = $('.widget-timeline-' + uid).empty();
    var timelineDIV = $('<div class="timeline timeline-' + uid + '"></div>').appendTo(widgetDIV);
    var wrapDIV = $('<div class="timeline__wrap"></div>').appendTo(timelineDIV);
    var itemsDIV = $('<div class="timeline__items"></div>').appendTo(wrapDIV);

    var timeline = thisWidget.getProperty('timeline');
    var compact = thisWidget.getProperty('compact');
    var debugMode = thisWidget.getProperty('debugMode');

    if (timeline && timeline.rows) {
      if (compact) {
        widgetDIV.addClass("timeline-compact");
      }
      
      var contentKey = timeline.isCompressed ? timeline.dataShape.fieldDefinitions.content.alias : "content";
      var selectableKey = timeline.isCompressed ? timeline.dataShape.fieldDefinitions.selectable.alias : "selectable";
      var backgroundColorKey = timeline.isCompressed ? timeline.dataShape.fieldDefinitions.backgroundColor.alias : "backgroundColor";
      var borderColorKey = timeline.isCompressed ? timeline.dataShape.fieldDefinitions.borderColor.alias : "borderColor";
      var timelineColorFromHereKey = timeline.isCompressed ? timeline.dataShape.fieldDefinitions.timelineColorUntilHere.alias : "timelineColorFromHere";

      var style = "";
      for (var index = 0; index < timeline.rows.length; index++) {
        var itemDIV = $('<div class="timeline__item timeline__item_' + index + '"></div>').appendTo(itemsDIV);
        var contentDIV = $('<div class="timeline__content">' + timeline.rows[index][contentKey] + '</div>').appendTo(itemDIV);

        if (timeline.rows[index][selectableKey]) {
          style += '.widget-timeline-' + uid + ' .timeline__item_' + index + ':after {cursor: pointer !important}';
          $('.widget-timeline-' + uid + ' .timeline__item_' + index).click(function () {
            var index = $(this).index();
            thisWidget.setProperty("selectedIndex", index);
            thisWidget.setProperty("selectedItem", TW.InfoTableUtilities.CloneInfoTable({
              "dataShape": timeline.dataShape,
              "rows": timeline.rows.filter((row, idx) => index === idx)
            }));

            thisWidget.updateSelection('timeline', [index]);
            thisWidget.jqElement.triggerHandler("ItemSelected");
          });
        }
        if (timeline.rows[index][backgroundColorKey]) {
          style += '.widget-timeline-' + uid + ' .timeline__item_' + index + ':after {background-color: ' + timeline.rows[index][backgroundColorKey] + ' !important}';
        }
        if (timeline.rows[index][borderColorKey]) {
          style += '.widget-timeline-' + uid + ' .timeline__item_' + index + ':after {border-color: ' + timeline.rows[index][borderColorKey] + ' !important}';
        }
        if (timeline.rows[index][timelineColorFromHereKey]) {
          style += '.widget-timeline-' + uid + ' .timeline__item_' + index + ':before {background: ' + timeline.rows[index][timelineColorFromHereKey] + '}';
        }
      }

      if (style) {
        $("<style>" + style + "</style>").prependTo(widgetDIV);
      }

      var verticalAlignment = thisWidget.getProperty('verticalAlignment');
      var horizontalStartPosition = verticalAlignment === "top" || verticalAlignment === "bottom" ? verticalAlignment : verticalAlignment.substring(0, verticalAlignment.indexOf("-"));

      $('.timeline-' + uid).timeline({
        'mode': 'horizontal',
        'forceVerticalMode': 10,
        'horizontalStartPosition': horizontalStartPosition,
        'moveItems': thisWidget.getProperty('moveItems'),
        'startIndex': thisWidget.getProperty('startIndex'),
        'visibleItems': thisWidget.getProperty('visibleItems')
      });

      if (verticalAlignment === "top") {
        var mutationObserver = new MutationObserver(thisWidget.observeTop);
        $('.timeline-' + uid).addClass("timeline-all-top");

        $(".timeline-" + uid + " .timeline__item--bottom").removeClass("timeline__item--bottom").addClass("timeline__item--top").each(function (index) {
          mutationObserver.observe(this, {attributeFilter: ["class"]});
        });
      } else if (verticalAlignment === "bottom") {
        var mutationObserver = new MutationObserver(thisWidget.observeBottom);
        $('.timeline-' + uid).addClass("timeline-all-bottom");

        $(".timeline-" + uid + " .timeline__item").removeClass("timeline__item--top").addClass("timeline__item--bottom").each(function (index) {
          mutationObserver.observe(this, {attributeFilter: ["class"]});
        });
      }

      if (debugMode) {
        console.log("Timeline - Inited");
      }
      thisWidget.jqElement.triggerHandler("Inited");
    }
  };

  this.observeTop = function (mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.attributeName === "class") {
        $(mutation.target).removeClass("timeline__item--bottom");
      }
    }
  };

  this.observeBottom = function (mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.attributeName === "class") {
        $(mutation.target).removeClass("timeline__item--top");
      }
    }
  };
};