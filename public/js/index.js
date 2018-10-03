$(document).ready(() => {
  $('.create-form').on('submit', function (evt) {
    evt.preventDefault();
    const id = $(this).parent('.article').attr('id');
    const body = $('#comment', this).val();

    $.ajax({
      method: 'POST',
      url: `article/${id}`,
      data: {
        body: body,
      },
    })
      .then((data) => {
        console.log('DATA', data);
        $('#comment').val('');
        window.location.reload(false);
      });
  });
});
