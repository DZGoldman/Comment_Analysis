def self.testy(str)
  options = {
    :basic_auth => {
      :username =>Rails.application.secrets.tone_api_username,
      :password => Rails.application.secrets.tone_api_password,
    },
    :query => {
      'version' => '2016-05-19',
      'sentences'=> false
    },
    :body => str,
    :headers => {
      'Content-Type' => 'text/plain'
    }
  }

  return HTTParty.post('https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone/',
  options )

end
