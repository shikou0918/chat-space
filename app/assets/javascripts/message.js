$(function(){
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
                  ${message.date}
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
      alert('メッセージ送信に失敗しました')
      $('.submit-btn').prop('disabled', false);
    })
  })
})
