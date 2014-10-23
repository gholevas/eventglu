myapp.directive('swapBgs', [function() {
  return {
    restrict: 'EA',

    link: function(scope, element, attrs) {
      function setFooterBackground(bgNumber) {
        var prev = element.find('.bg');

        setTimeout(function () {
          prev.remove();
        }, 4100);

        var el = document.createElement('div');
        el.className += 'bg bg' + bgNumber;

        element.append(el);

        setTimeout(function () {
          el.className += ' show';
        }, 20);
      }

      function footerBgRotating(interval) {
        var current = 1;

        setInterval(function () {
          setFooterBackground((current % 5) + 1);
          current++;
        }, interval);
      }

      footerBgRotating(8000);
    }
  };
}]);

myapp.directive('widgetTrigger', [function() {
  return {
    restrict: 'EA',

    link: function(scope, element, attrs) {
      console.log(element);
      element.on('click', function() {
        element.parent().siblings().find('.widget-trigger').addClass('collapsed');
        var $el = $(element.attr('data-target'));
        $el.siblings().removeClass('in');
      });
    }
  };
}]);

myapp.directive('uiCalendar', [function() {
  return {
    restrict: 'EA',

    link: function(scope, element, attrs) {
      var $calendar = element.find('.cal');
      var $trigger = element.find('.calendar-trigger');
      
      $calendar.datepicker();

      $trigger.on('click', function() {
        $.datepicker._showDatepicker($calendar[0]);
      });
    }
  };
}]);

myapp.directive('imageGallery', [function() {
  return {
    restrict: 'EA',

    link: function(scope, element, attrs) {
      var $carousel = element.find('.carousel');
      var $imgs = element.find('.item img');
      var $caption = element.find('.caption');
      var $bigImage = element.find('.big-image');

      $carousel.on('slid.bs.carousel', function(e) {
        var direction = e.direction;
        var $currentItem = element.find('.active');
        $imgs.removeClass('current');

        var $newImgs = $currentItem.find('img');

        if (direction == 'left')
          position = 0;
        else
          position = $newImgs.length - 1;

        $($newImgs[position]).addClass('current');
        $caption.html($($newImgs[position]).attr('alt'));
        var src = $($newImgs[position]).attr('src');
        $bigImage.attr('src', src);
      });

      $($imgs[0]).addClass('current');
      $caption.html($($imgs[0]).attr('alt'));
      var src = $($imgs[0]).attr('src');
      $bigImage.attr('src', src);

      $imgs.on('click', function() {
        $imgs.removeClass('current');
        $(this).addClass('current');
        
        var src = $(this).attr('src');
        var caption = $(this).attr('alt');
        
        $caption.html(caption);
        $bigImage.attr('src', src);
      });
    }
  };
}]);

myapp.directive('uiSlider', [function() {
  return {
    restrict: 'EA',

    scope: {
      val: "=",
      range: "@",
      min: "=",
      max: "=",
      units: "@"
    },

    link: function(scope, element, attrs) {
      var $slider = element.find('.ui-slider');
      var $text = element.find('.text');

      if (scope.range == 'true') {
        $slider.slider({
          range: true,
          min: scope.min,
          max: scope.max,
          values: scope.val,
          slide: function( event, ui ) {
            $text.text(scope.units + ui.values[0] + " - " + scope.units + ui.values[ 1 ] );
          }
        });
        $text.text(scope.units + $slider.slider("values", 0) + " - " + scope.units + $slider.slider("values", 1));
      } else {
        $slider.slider({
          range: scope.range,
          min: scope.min,
          max: scope.max,
          value: scope.val,
          slide: function(event, ui) {
            $text.text(ui.value + ' ' + scope.units);
          }
        });
        $text.text($slider.slider('value') + ' ' + scope.units);
      }
    }
  };
}]);

myapp.directive('checkItem', [function() {
  return {
    restrict: 'EA',

    link: function(scope, element, attrs) {
      var $radios = element.find('input[type="radio"]');
      var $lis = element.find('li');
      var $checkboxes = element.find('input[type="checkbox"]');

      angular.forEach($radios, function (radio, i) {
        var rd = $(radio);
        if (rd.is(':checked'))
          rd.parent().parent().addClass('active');
      });

      $radios.on('change', function() {
        $lis.removeClass('active');
        var $item = $(this).parent().parent();

        if ($(this).is(':checked')) 
          $item.addClass('active');
        else 
          $item.removeClass('active');
      });

      $checkboxes.on('change', function() {
        var $li = $(this).parent().parent();

        if ($(this).is(':checked')) 
          $li.addClass('active');
        else 
          $li.removeClass('active');
      });
    }
  };
}]);

myapp.directive('resetTab', [function() {
  return {
    restrict: 'EA',

    link: function(scope, element, attrs) {
      var $tabs = element.find('.details-extras-tabs');
      element.on('hidden.bs.modal', function (e) {
        if (element.hasClass('dt-modal'))
          $tabs.find('a:first').tab('show');
        else if (element.hasClass('ex-modal'))
          $tabs.find('a:last').tab('show');
      });
    }
  };
}]);

myapp.directive('switchGrid', [function() {
  return {
    restrict: 'EA',

    scope: {
      grid: '@'
    },

    link: function(scope, element, attrs) {
      var $tiles = $('li.tile');
      
      element.on('click', function() {
        $('.grids li').removeClass('active');
        $(this).parent().addClass('active');

        if (scope.grid == 'square') $tiles.addClass('square');
        else $tiles.removeClass('square');
      });
    }
  };
}]);

myapp.directive('enableSwap', [function() {
  return {
    restrict: 'EA',

    link: function(scope, element, attrs) {
      var $panes = element.find('.tab-pane');
      var $tabList = element.find('>ul');

      $panes.swiperight(function() {
        var index = $(this).attr('data-index') * 1;
        
        if (index == 1)
          element.find('ul a[data-index="' + $panes.length + '"]').tab('show');
        else
          element.find('ul a[data-index="' + (index - 1) + '"]').tab('show');
      });

      $panes.swipeleft(function() {
        var index = $(this).attr('data-index') * 1;

        if (index == $panes.length)
          element.find('ul a[data-index="1"]').tab('show');
        else
          element.find('ul a[data-index="' + (index + 1) + '"]').tab('show');
      });
    }
  };
}]);