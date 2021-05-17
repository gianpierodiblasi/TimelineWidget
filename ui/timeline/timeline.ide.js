/* global TW */
TW.IDE.Widgets.timeline = function () {
  this.widgetIconUrl = function () {
    return '../Common/extensions/TimelineWidget/ui/timeline/timeline.png';
  };

  this.widgetProperties = function () {
    return {
      'name': 'timeline',
      'description': 'Widget to visualize a timeline',
      'category': ['Common'],
      'iconImage': 'timeline.png',
      'supportsAutoResize': true,
      'properties': {
        'Width': {
          'description': 'width',
          'defaultValue': 200
        },
        'Height': {
          'description': 'height',
          'defaultValue': 200
        },
        'timeline': {
          'isVisible': true,
          'baseType': 'INFOTABLE',
          'isBindingTarget': true,
          'isEditable': false,
          'description': 'The infotable representing the timeline (use or duplicate & extend the Data Shape ds_Timeline)',
          'warnIfNotBoundAsTarget': true
        },
        'selectedIndex': {
          'isVisible': true,
          'baseType': 'INTEGER',
          'isBindingSource': true,
          'isEditable': false,
          'defaultValue': -1,
          'description': 'The index of the (eventually) selected item'
        },
        'selectedItem': {
          'isVisible': true,
          'baseType': 'INFOTABLE',
          'isBindingSource': true,
          'isEditable': false,
          'defaultValue': null,
          'description': 'The (eventually) selected item'
        },
        'verticalAlignment': {
          'isVisible': true,
          'baseType': 'STRING',
          'isEditable': true,
          'defaultValue': 'top-bottom',
          'description': 'Define the vertical alignment of the items',
          'selectOptions': [
            {value: 'top-bottom', text: 'Top & Bottom'},
            {value: 'bottom-top', text: 'Bottom & Top'},
            {value: 'top', text: 'Top'},
            {value: 'bottom', text: 'Bottom'}
          ]
        },
        'moveItems': {
          'isVisible': true,
          'baseType': 'INTEGER',
          'isEditable': true,
          'defaultValue': 1,
          'description': 'Define how many items to move when clicking a navigation button'
        },
        'startIndex': {
          'isVisible': true,
          'baseType': 'INTEGER',
          'isEditable': true,
          'isBindingTarget': true,
          'defaultValue': 0,
          'description': 'Define which item the timeline should start at'
        },
        'visibleItems': {
          'isVisible': true,
          'baseType': 'INTEGER',
          'isEditable': true,
          'defaultValue': 3,
          'description': 'Define how many items are visible in the viewport'
        },
        'debugMode': {
          'isVisible': true,
          'baseType': 'BOOLEAN',
          'isEditable': true,
          'defaultValue': false,
          'description': 'true to activate the debug'
        }
      }
    };
  };

  this.renderHtml = function () {
    return '<div class="widget-content widget-timeline">' + '<span class="timeline-property">Timeline</span>' + '</div>';
  };

  this.widgetServices = function () {
    return {
    };
  };

  this.widgetEvents = function () {
    return {
      'Inited': {},
      'ItemSelected': {}
    };
  };
};