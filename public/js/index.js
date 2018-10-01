$(document).ready(() => {
  $('.create-form').on('submit', function (evt) {
    evt.preventDefault();
    const id = $(this).parent('.article').attr('id');
    console.log('ID', id);

    $.ajax({
      method: 'POST',
      url: `article/${id}`,
      data: {
        body: $('#comment').val()
      }
    })
    .then(data => {
      console.log('DATA', data);
    });
    return false;
  });
});