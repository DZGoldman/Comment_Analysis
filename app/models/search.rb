class Search < ActiveRecord::Base
  def self.error_message_json message
    messages = {
      :url => 'Invalid url(s). Try again'
    }
    return {
      :success? => false,
      :message => messages[message]
    }
  end


    def self.extract_video_id(url)
      id = url.split('youtube.com/watch?v=').last
      if id.length == url.length or url.length==0
        return false
      else
        return id
      end
    end


end
