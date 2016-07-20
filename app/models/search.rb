class Search < ActiveRecord::Base
  def self.error_message_json message
    messages = {
      :url => 'Invalid url(s). Try again',
      :youtube_api => 'Failed to get youtube comments.',
      :watson_api => 'Failed to get tone data.'
    }
    return {
      :success? => false,
      :message => messages[message]
    }
  end


    def self.extract_video_id(url)
      puts 'in url', (url.class), (url.length)
      return false if url.length==0
      id = url.split('youtube.com/watch?v=').last
      if id.length == url.length
        return false
      else
        return id
      end
    end


end
