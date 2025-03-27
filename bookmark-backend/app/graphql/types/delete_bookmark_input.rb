# frozen_string_literal: true

module Types
  class DeleteBookmarkInput < Types::BaseInputObject
    description "Входные данные для удаления закладки"

    argument :id, ID,
             required: true,
             description: "ID закладки для удаления"
  end
end 