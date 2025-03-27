# app/services/bookmark_service.rb
class BookmarkService
  def create(params)
    bookmark = Bookmark.new(params)
    if bookmark.save
      bookmark
    else
      nil
    end
  end

  def destroy(bookmark)
    bookmark.destroy
  end
end
