var carousel = '';
var items = {};
var currentPosition = 0;
var maxPosition = 0;
jQuery(document).ready(function($) {
    carousel = $('#carousel');

    items.visible = 3,
    items.container = $('.wrapper > ul', carousel),
    items.animateContainer = function(position) {
        items.container.animate({top: position + 'px'}, 300);
    };
    items.count = $('> li', items.container).length;
    items.height = $('> li', items.container).outerHeight();


    $('.wrapper', carousel)
        .css('overflow', 'hidden')
        .css('position', 'relative')
        .css('height', (items.height * items.visible));

    $(items.container, carousel)
        .css('position', 'absolute')
        .css('height', (items.height * items.count));
    

    items.initialPosition = items.container.position().top;

    currentPosition = items.initialPosition;

    maxPosition = (items.count - items.visible) * items.height;
    maxPosition = -(maxPosition - items.initialPosition);


    $(carousel)
        .find('> .prev').click(function(event) {
            event.preventDefault();

            if (currentPosition < items.initialPosition) {
                currentPosition += items.height;
                items.animateContainer(currentPosition);
            }
        })
        .parent()
        .find('> .next').click(function(event) {
            event.preventDefault();
            
            if (currentPosition > maxPosition) {
                currentPosition -= items.height;
                items.animateContainer(currentPosition);
            }
        });
    
    items.container
        .css('cursor', 'pointer')
        .draggable({
            axis: 'y',
            stop: function(event, ui) {

                if (ui.position.top > items.initialPosition) {
                    currentPosition = items.initialPosition;

                } else if (ui.position.top < maxPosition) {
                    currentPosition = maxPosition;

                } else {
                    var dragPosition = -(ui.position.top);

                    for(var x = 0; x < items.count; x++) {
                        if(
                            dragPosition >= (x*items.height)
                            && dragPosition < ((x+1)*items.height)
                        ){                            
                            multiplier = x;
                            if(dragPosition-(x*items.height) > (items.height/2)) {
                                multiplier = x + 1;
                            }

                            currentPosition = -(items.height*multiplier)+items.initialPosition;
                        }
                    }
                }

                items.animateContainer(currentPosition);
            }
        });
});