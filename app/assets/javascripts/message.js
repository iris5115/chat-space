$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <ul class="message__lists">
          <li class="message__lists__user-name">
            ${message.user_name}
          </li>
          <li class="message__lists__daytime">
            ${message.created_at}
          </li>
        </ul>
        <div class="message__content">
          <p class="message__content__text">
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>`
      return html;
    } else {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <ul class="message__lists">
          <li class="message__lists__user-name">
            ${message.user_name}
          </li>
          <li class="message__lists__daytime">
            ${message.created_at}
          </li>
        </ul>
        <div class="message__content">
          <p class="message__content__text">
            ${message.content}
          </p>
        </div>          
      </div>`
      return html;
    };
  }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    $('form')[0].reset();
    $('.new_message__submit').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});
})
});