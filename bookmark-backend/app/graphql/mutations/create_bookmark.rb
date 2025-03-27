# app/graphql/mutations/create_bookmark.rb
module Mutations
  class CreateBookmark < BaseMutation
    description "Мутация для создания новой закладки"

    argument :input, Types::CreateBookmarkInput,
             required: true,
             description: "Входные данные для создания закладки"

    field :bookmark, Types::BookmarkType,
          null: true,
          description: "Созданная закладка, если операция выполнена успешно"

    field :errors, [String],
          null: false,
          description: "Список ошибок, если операция не выполнена"

    def resolve(input:)
      service = BookmarkService.new
      bookmark = service.create(title: input.title, url: input.url)
      
      if bookmark
        { bookmark: bookmark, errors: [] }
      else
        temp_bookmark = Bookmark.new(title: input.title, url: input.url)
        temp_bookmark.valid?
        { bookmark: nil, errors: temp_bookmark.errors.full_messages }
      end
    end
  end
end
