class ApiController < ApplicationController
  def analyze
    video_1_data = Api.analyze(params[:url1])
    video_2_data = Api.analyze(params[:url2])
      render json: {
        :video_1_data => video_1_data,
        :video_2_data => video_2_data
      }
  end
end
