# frozen_string_literal: true

module Types
  class UpdateBookmarkInput < Types::BaseInputObject
    description "Входные данные для обновления закладки"

    argument :id, ID,
             required: true,
             description: "ID закладки для обновления"

    argument :title, String,
             required: true,
             description: "Новый заголовок закладки"

    argument :url, String,
             required: true,
             description: "Новый URL закладки"
  end
end 