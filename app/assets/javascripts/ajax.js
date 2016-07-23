$(function() {

  $('#submit').click(function() {
    // Loading Animation
    var loadingText = $('<span class="sr-only">Loading...</span>');
    $('#loading').append(loadingText);
    var loadingIcon = $('<span>');
    loadingIcon.addClass('fa fa-cog fa-spin fa-3x fa-fw');
    $('#loading').append(loadingIcon);

    // Get URLs
    var url1 = $('#video_link_1').val().trim();
    // var url1 = 'https://www.youtube.com/watch?v=QqkFD-QDDhI'
    var url2 = $('#video_link_2').val().trim()
    // var url2 = 'https://www.youtube.com/watch?v=kVJbA7KQIo0'

    // Get Analysis from Backend
    $.ajax({
      type: 'post',
      url: '/api/analyze',
      data: {
        url1: url1,
        url2: url2
      }
    }).done(function(data) {
      // Clear animation
      $('#loading').empty();

      // Initialize variables
      var toneCellsArray = []
      var toneCellsDataArray = [data.video_1_data, data.video_2_data];

      // Run video analysis processing for Front End
      toneCellsDataArray.forEach(function (specificVideo, i) {
        if(data.video_1_data.document_tone){
          $('#container').empty();
          toneCellsArray[i] = createIndividualVideoAnalysis(toneCellsDataArray[i],i+1);
        } else {
          $('#container').append($('<p>').text('Error Loading Visuals. Plase Select Other Videos to Analayze'));
        }
      })

      // Add sorting buttons with isotope animation and functionality
      $('.sortButtons').on( 'click', 'button', function() {
        var sortType = $(this).attr('data-sortType');
        if(sortType == 'score'){
          toneCellsArray[0].isotope({ sortBy: sortType, sortAscending: false });
          toneCellsArray[1].isotope({ sortBy: sortType, sortAscending: false });
        } else {
          toneCellsArray[0].isotope({ sortBy: sortType, sortAscending: true});
          toneCellsArray[1].isotope({ sortBy: sortType, sortAscending: true});
        }
      });
    })
  })
})

function createIndividualVideoAnalysis(specificVideoData, videoNum) {
  // Build up specificVideoContainer with each video's analysis tones
  var specificVideoContainer = $('<div>');
  var toneCateogories = specificVideoData.document_tone.tone_categories;
  toneCateogories.forEach(function (toneCategory, index) {
    $('#container'+videoNum).append(specificVideoContainer);
    toneCategory.tones.forEach(function (tone, index2) {
      var toneContainer = $('<div>');
      var toneHeading = $('<h6>');
      toneHeading.addClass('name');
      var toneScore = $('<h6>');
      toneScore.addClass('score');
      toneHeading.text(tone.tone_name);
      toneScore.text(Math.round(tone.score*100)/100);
      toneContainer.append(toneHeading);
      toneContainer.append(toneScore);
      toneContainer.addClass('sub-category');
      toneContainer.css({
        'background-color': 'rgba(255,0,200,'+ tone.score +')'
      });
      $('#container' + videoNum).append(toneContainer);
    })
  })
  // Build up isotope data
  $toneCells = $('#container' + videoNum).isotope({
    itemSelect: '.sub-category',
    layoutMode: 'fitRows',
    getSortData: {
      name: '.name',
      score: '.score'
    }
  })
  // Return isotope data
  return $toneCells;
}
