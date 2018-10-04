$(document).ready(() => {
  $('.create-form').on('submit', function cb(evt) {
    evt.preventDefault();
    const id = $(this).parent('.article').attr('id');
    const body = $('#comment', this).val();

    $.ajax({
      method: 'POST',
      url: `article/${id}`,
      data: {
        body,
      },
    })
      .then(() => {
        $('#comment').val('');
        window.location.reload(false);
      });
  });

  $('.comment').on('click', function cb(evt) {
    evt.preventDefault();
    const id = $(this).attr('id');

    $.ajax({
      method: 'DELETE',
      url: `comment/${id}`,
    })
      .then(() => {
        window.location.reload(false);
      });
  });
});
