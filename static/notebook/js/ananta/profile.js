

var IPython = (function (IPython) {

    var Profile = function (kernel, options) {

        IPython.CodeCell.apply(this,kernel,[options]);
    };

    Profile.prototype = new IPython.CodeCell();


    Profile.prototype.create_element = function () {

        IPython.Cell.prototype.create_element.apply(this, arguments);

        var prof = $('<div></div>');
        var cell =  $('<div></div>').addClass('cell border-box-sizing code_cell');
        cell.attr('tabindex','2');

        var input = $('<div></div>').addClass('input');
        var prompt = $('<div/>').addClass('prompt input_prompt');
        var inner_cell = $('<div />').addClass('inner_cell');
        this.celltoolbar = new IPython.CellToolbar(this);
        inner_cell.append(this.celltoolbar.element);
        var input_area = $('<div style="display: none;"/>').addClass('input_area');
        //var input_area = $('<div/>').addClass('input_area');
        this.code_mirror = CodeMirror(input_area.get(0), this.cm_config);
        $(this.code_mirror.getInputField()).attr("spellcheck", "false");
        inner_cell.append(input_area);
        //input.append(prompt).append(inner_cell);
        input.append(inner_cell);

        var widget_area = $('<div/>')
            .addClass('widget-area')
            .hide();
        this.widget_area = widget_area;
        var widget_prompt = $('<div/>')
            .addClass('prompt')
            .appendTo(widget_area);
        var widget_subarea = $('<div/>')
            .addClass('widget-subarea')
            .appendTo(widget_area);
        this.widget_subarea = widget_subarea;
        var widget_clear_buton = $('<button />')
            .addClass('close')
            .html('&times;')
            .click(function() {
                widget_area.slideUp('', function(){ widget_subarea.html(''); });
            })
            .appendTo(widget_prompt);

        var output = $('<div></div>');
        var visdiv = $('<div id="flpvisdiv"></div>');

        this.b1id = this.id+"flpSetBtn";
        this.b2id = this.id+"flpExcBtn";
        this.b3id = this.id+"flpVisBtn";
        this.b4id = this.id+"flpSSBtn";
        this.profileheading = $('<h4>'+this.heading+'</h4>');

        this.b1 = $('<button id="'+this.b1id+'" type="button" class="btn btn-default">Profile Settings</button>');
        this.b2 = $('<button id="'+this.b2id+'" type="button" class="btn btn-default">Execute Profile</button>');
        this.b3 = $('<button id="'+this.b3id+'" type="button" class="btn btn-default">Visualize </button>');
        this.b4 = $('<button id="'+this.b4id+'" type="button" class="btn btn-default">Show Statistics</button>');
        var btngrp = $('<div class="btn-group profile-element" role="group" aria-label="..."></div>');

        btngrp.append(this.b1).append(this.b2).append(this.b3).append(this.b4);

        var left = $('<div id="sidebuttons" ></div>');
        var brk = $('<br>');
        var right = $('<div id="visarea" "></div>');
        var full = $('<div></div>');

        right.append(this.profileheading);
        full.addClass('clear');
        output.addClass('profile-element');

        left.append(prompt)
        full.append(left).append(right).append(btngrp).append(input).append(widget_area).append(output).append(visdiv);
        cell.append(full);

        this.element = cell;
        this.output_area = new IPython.OutputArea(output, true);
        this.completer = new IPython.Completer(this);


    };


    Profile.input_prompt_classical = function (prompt_value, lines_number) {
        var ns;
        if (prompt_value === undefined) {
            ns = "&nbsp;";
        } else {
            ns = encodeURIComponent(prompt_value);
        }
        return 'Profile&nbsp;[' + ns + ']:';
    };

    IPython.Profile = Profile;

    return IPython;
}(IPython));

///