(params) => {
  var name = params.name;
  
  var bodyParams = {public: true, name: name};
  
  var result = api.run("spotify.create_playlist", {user_id: "salce_", $body: bodyParams});
  
  return {id: result[0].id};

}