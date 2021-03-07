/*  SEARCH FUNCTIONALITY IS A STRETCH.
    IT IS NOT A REQUIREMENT FOR THE MIDTERM PROJECT.
*/


$(() => {

  const $searchForm = $(`
  <form action="/stories/search" method="get" id="search-story-form" class="search-story-form">
      <div class="search-story-form__field-wrapper">
        <label for="search-story-form__title">Title</label>
        <input type="text" name="title" placeholder="Title" id="search-story-form__title">
      </div>
      <div class="search-story-form__field-wrapper">
        <label for="search-story-form__username">Author</label>
        <input type="text" name="username" placeholder="Username" id="search-story-form__username">

        <label for="search-story-form__tags">Tags</label>
        <input type="text" name="tags" placeholder="tags (example: tag1, tag2, ... )" id="search-story-form__tags">
      </div>
      <div class="search-story-form__field-wrapper">
        <input type="radio" name="active" value="true" id="search-story-form__activeTrue">
        <label for="search-story-form__activeTrue">True</label>

        <input type="radio" name="active" value="false" id="search-story-form__activeFalse">
        <label for="search-story-form__activeFalse">False</label>
      </div>
      <div class="search-story-form__field-wrapper">
          <button>Search</button>
          <a id="search-story-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  `)
  window.$searchForm = $searchForm;

  $searchForm.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    getAllListings(data)
      .then(() => {
        //NEEDS TO BE IMPLEMENTED
      });
  });

  $('body').on('click', '#search-story-form__cancel', () => {
    //NEEDS TO RETURN TO 'ALL STORIES' VIEW
    return false;
  });

});
