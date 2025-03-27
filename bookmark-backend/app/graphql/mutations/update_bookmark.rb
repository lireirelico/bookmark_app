# frozen_string_literal: true

module Mutations
  class UpdateBookmark < BaseMutation
    description "Мутация для обновления существующей закладки"

    argument :input, Types::UpdateBookmarkInput,
             required: true,
             description: "Входные данные для обновления закладки"

    field :bookmark, Types::BookmarkType,
          null: true,
          description: "Обновленная закладка, если операция выполнена успешно"

    field :errors, [String],
          null: false,
          description: "Список ошибок, если операция не выполнена"

    def resolve(input:)
      bookmark = Bookmark.find_by(id: input.id)
      unless bookmark
        return {
          bookmark: nil,
          errors: ["Закладка не найдена"]
        }
      end

      if bookmark.update(title: input.title, url: input.url)
        {
          bookmark: bookmark,
          errors: []
        }
      else
        {
          bookmark: nil,
          errors: bookmark.errors.full_messages
        }
      end
    end
  end
end
