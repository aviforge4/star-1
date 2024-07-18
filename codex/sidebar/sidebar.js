$(document).ready(function() {
    // Toggle sidebar on menu button click
    $('#menuButton').click(function() {
        $('#sidebar').toggleClass('open');
    });

    // Close sidebar when clicking outside of it
    $(document).click(function(e) {
        if (!$(e.target).closest('#sidebar, #menuButton').length) {
            $('#sidebar').removeClass('open');
        }
    });

    // Close sidebar on close icon click
    $('#closeSidebar').click(function() {
        $('#sidebar').removeClass('open');
    });

    // Toggle sub-options and angle icon for Settings
    $('.list-group-item[data-option="settings"]').click(function() {
        $('#settingsSubOptions').toggleClass('open');
        $(this).find('.fa-angle-down').toggleClass('fa-angle-up');
    });

    // Toggle sub-options and angle icon for Activity
    $('.list-group-item[data-option="activity"]').click(function() {
        $('#activitySubOptions').toggleClass('open');
        $(this).find('.fa-angle-down').toggleClass('fa-angle-up');
    });

    // Toggle sub-options and angle icon for History
    $('.list-group-item[data-option="history"]').click(function() {
        $('#historySubOptions').toggleClass('open');
        $(this).find('.fa-angle-down').toggleClass('fa-angle-up');
    });

    // Toggle sub-options and angle icon for Help
    $('.list-group-item[data-option="help"]').click(function() {
        $('#helpSubOptions').toggleClass('open');
        $(this).find('.fa-angle-down').toggleClass('fa-angle-up');
    });
});
