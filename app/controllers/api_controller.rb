class ApiController < ApplicationController

  def analyze

  id_1 = Api.extract_video_id(params[:url1])
  id_2 = Api.extract_video_id(params[:url2])

  if !id_1 or !id2 then render json: Api.invalid_url end

  video_1_data = Api.analyze(params[:url1])
  video_2_data = Api.analyze(params[:url2])
      render json: {
        :video_1_data => video_1_data,
        :video_2_data => video_2_data
      }
  end
end
