class ApiController < ApplicationController

  def analyze

  id_1 = Search.extract_video_id(params[:url1])
  id_2 = Search.extract_video_id(params[:url2])
  return render json: Search.error_message_json(:url)  if !id_1 or !id_2

  comments_1 = Api.get_comments(id_1)
  comments_2= Api.get_comments(id_2)
  return render json: Search.error_message_json(:youtube_api)  if !comments_1 or !comments_2
  str_1 = Api.get_comments_as_string(comments_1)
  str_2 = Api.get_comments_as_string(comments_2)

  stats_1 =  Api.get_stats(comments_1, str_1)
  stats_2 = Api.get_stats(comments_2, str_2)

  tone_1 = Api.get_tone(str_1)
  tone_2 = Api.get_tone(str_2)
  return render json: Search.error_message_json(:watson_api) if tone_1.response.code.first!='2' or tone_2.response.code.first!='2'

  video_1_data = stats_1.merge(tone_1)
  video_2_data = stats_2.merge(tone_2)
      render json: {
        :success? => true,
        :video_1_data => video_1_data,
        :video_2_data => video_2_data
      }
  end
end
