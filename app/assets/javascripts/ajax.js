$(function() {
  $('#submit').click(function() {
    var loadingIcon = $('<span>');
    loadingIcon.addClass('fa fa-circle-o-notch fa-spin');
    $('body').append(loadingIcon);
    'fa fa-circle-o-notch fa-spin'
    var url1 = $('#video_link_1').val().trim();
    var url2 = $('#video_link_2').val().trim()
    $.ajax({
      type: 'post',
      url: '/api/analyze',
      data: {
        url1: url1,
        url2: url2
      }
    }).done(function(data) {
      loadingIcon.removeClass('fa fa-circle-o-notch fa-spin');
      if(data.video_1_data.document_tone){
        $('#container').empty();
        draw(data)
      } else {
        $('#container').append($('<p>').text('Error Loading Visuals. Plase Select Other Videos to Analayze'));
      }
    })
  })
})

function draw(data){
  createIndividualVideoAnalysis(data.video_1_data,1);
  createIndividualVideoAnalysis(data.video_2_data,2);
}

function createIndividualVideoAnalysis(specificVideoData, videoNum) {
  var specificVideoContainer = $('<div>');
  var specificVideoHeading = $('<h2>');
  // specificVideoHeading.text('Video ' + videoNum);
  // specificVideoContainer.append(specificVideoHeading);
  specificVideoContainer.addClass('specific-video-analysis');
  var toneCateogories = specificVideoData.document_tone.tone_categories;
  toneCateogories.forEach(function (toneCategory, index) {
    var toneCategoryContiner = $('<div>');
    toneCategoryContiner.addClass('main-category');
    var categoryNameClass = toneCategory.category_name.split(" ").join("-").toLowerCase();
    toneCategoryContiner.addClass(categoryNameClass);
    // var toneCategoryHeading = $('<h3>');
    // toneCategoryHeading.text(toneCategory.category_name);
    // toneCategoryContiner.append(toneCategoryHeading);
    specificVideoContainer.append(toneCategoryContiner);
    $('#container').append(specificVideoContainer);
    toneCategory.tones.forEach(function (tone, index2) {
      var toneContainer = $('<div>');
      var toneHeading = $('<h6>');
      var toneScore = $('<h6>');
      toneHeading.text(tone.tone_name);
      toneScore.text(tone.score);
      toneContainer.append(toneHeading);
      toneContainer.append(toneScore);
      toneContainer.addClass('sub-category');
      toneContainer.css({
        'background-color': 'rgba(255,0,200,'+ tone.score +')'
      });
      // NOTE: this selection is a bit hacky, but good enought for this phase
      $('#container > div:nth-child(' + videoNum + ') > .' + categoryNameClass).append(toneContainer);
    })
  })
}
