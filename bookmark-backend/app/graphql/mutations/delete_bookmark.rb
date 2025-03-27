# app/graphql/mutations/delete_bookmark.rb
module Mutations
  class DeleteBookmark < BaseMutation
    description "Мутация для удаления существующей закладки"

    argument :input, Types::DeleteBookmarkInput,
             required: true,
             description: "Входные данные для удаления закладки"

    field :bookmark, Types::BookmarkType,
          null: true,
          description: "Удаленная закладка, если операция выполнена успешно"

    field :errors, [String],
          null: false,
          description: "Список ошибок, если операция не выполнена"

    def resolve(input:)
      bookmark = Bookmark.find_by(id: input.id)
      return { bookmark: nil, errors: ["Закладка не найдена"] } unless bookmark

      service = BookmarkService.new
      if service.destroy(bookmark)
        { bookmark: bookmark, errors: [] }
      else
        { bookmark: nil, errors: bookmark.errors.full_messages }
      end
    end
  end
end
