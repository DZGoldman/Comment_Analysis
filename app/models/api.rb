class Api < ActiveRecord::Base


  self.invalid_url = {
      :success? => false,
      :message => 'Those not both valid urls'
    }

  def self.get_comments (video_id)
    query = {
      :query => {
        :key => Rails.application.secrets.youtube_api_key,
        :textFormat=> 'plainText',
        :part=> 'snippet',
        :videoId=> video_id,
        :maxResults=> 50
      }
    }
    response = HTTParty.get('https://www.googleapis.com/youtube/v3/commentThreads', query)
    return JSON.parse(response.body)['items']
  end

  def self.get_tone(str)
    query = {
      :basic_auth => {
        :username =>Rails.application.secrets.tone_api_username,
        :password => Rails.application.secrets.tone_api_password,
      },
      :query => {
        :text => str,
        :version => '2016-05-19'
      }
    }
    return HTTParty.get('https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone/', query)

  end


  def self.get_comments_as_string comments_array
      comment_string = ''
      comments_array.each  do |comment|
        comment_string+= comment['snippet']["topLevelComment"]['snippet']["textDisplay"]+" "
      end
      return comment_string
  end

  def self.get_stats comments_array, comment_string
    # Average word length:
    word_lengths = comment_string.split(' ').map{|word| word.length}
    average_word_length = word_lengths.reduce(:+)/word_lengths.length
    # Average word count in comments:
    comment_lengths = comments_array.map do |comment|
      text =  comment['snippet']["topLevelComment"]['snippet']["textDisplay"]
      text.split(' ').length
    end
    average_comment_length = comment_lengths.reduce(:+)/comment_lengths.length
    return {
      :average_word_length => average_word_length,
      :average_comment_length => average_comment_length
    }
  end


  def self.analyze (video_id)
    comments = Api.get_comments(video_id)
    str = Api.get_comments_as_string(comments)
    stats =  Api.get_stats(comments, str)
    puts 'bytttess:', str.bytesize
    tone = Api.get_tone(str)
    print tone
    return stats.merge(tone)
  end

  def self.extract_video_id(url)
    id = url.split('youtube.com/watch?v=').last
    unless id.length == url.length
      return id
    else
      return false
    end
  end

end
