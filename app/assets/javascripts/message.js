$(function(){

  
  // HTML作成
  function buildHTML(message){
    var img = (message.image) ? `<img class= "lower-message__image"><img src="${message.image}" ></p>` : "";
      var html = 
        `<div class="message" data-id="${message.id}">
          <div class="message__box">
            <div class="message__box__upper-info">
                <p class="message__box__upper-info__talker">
                  ${message.user_name}
                </p>
                <p class="message__box__upper-info__date">
                  ${message.created_at}
                </p>
            </div>
            <p class="message__box__text">
            </p>
            <p class="lower-message__content">
              ${message.content}
            </p>
              ${img}
            <p></p>
          </div>`
    return html;
  }

  //メッセージ送信の非同期化
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('form')[0].reset();
      $('.messages').animate({ 
        scrollTop: $('.messages')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      $('.submit-btn').prop('disabled', false);
    });
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data('id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
        $('.messages').animate({ 
          scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      });
      $('.messages').append(insertHTML);
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  }};
  setInterval(reloadMessages, 5000);
});
