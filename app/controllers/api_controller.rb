class ApiController < ApplicationController

  def analyze

  id_1 = Api.extract_video_id(params[:url1])
  id_2 = Api.extract_video_id(params[:url2])
  puts id_1, id_2
  return render json: Api.error_message_json(:url)  if !id_1 or !id_2



  video_1_data = Api.analyze(id_1)
  video_2_data = Api.analyze(id_2)
      render json: {
        :success? => true,
        :video_1_data => video_1_data,
        :video_2_data => video_2_data
      }
  end
end
