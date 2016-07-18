class ApiController < ApplicationController

  def analyze

  id_1 = Search.extract_video_id(params[:url1])
  id_2 = Search.extract_video_id(params[:url2])
  return render json: Search.error_message_json(:url)  if !id_1 or !id_2
  video_1_data = Api.analyze(id_1)
  video_2_data = Api.analyze(id_2)
      render json: {
        :success? => true,
        :video_1_data => video_1_data,
        :video_2_data => video_2_data
      }
  end
end
