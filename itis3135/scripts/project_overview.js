$(function() {
    $("#projectAccordion").accordion({
        heightStyle: "content",
        collapsible: true,
        active: false
    });

    function renderProjectPlan(plan) {
        var html = '<dl>';
        html += '<dt>Project Name</dt><dd>' + plan.projectName + '</dd>';
        html += '<dt>Timeline</dt><dd>' + plan.timeline + '</dd>';
        html += '<dt>Features</dt><dd><ul>' + plan.features.map(function(feature) {
            return '<li>' + feature + '</li>';
        }).join('') + '</ul></dd>';
        html += '<dt>User Groups</dt><dd>' + plan.userGroups.join(', ') + '</dd>';
        html += '<dt>Primary Pages</dt><dd><ol>' + plan.pages.map(function(page) {
            return '<li><strong>' + page.name + '</strong>: ' + page.purpose + '</li>';
        }).join('') + '</ol></dd>';
        html += '</dl>';
        $("#planData").html(html);
    }

    $.getJSON("scripts/project_data.json")
        .done(function(data) {
            renderProjectPlan(data);
        })
        .fail(function() {
            $("#planData").html('<p>Unable to load project plan data. Please try refreshing the page.</p>');
        });
});
