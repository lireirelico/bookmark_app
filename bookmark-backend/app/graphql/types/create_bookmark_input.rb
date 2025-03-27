# frozen_string_literal: true

module Types
  class CreateBookmarkInput < Types::BaseInputObject
    description "Входные данные для создания закладки"

    argument :title, String,
             required: true,
             description: "Заголовок закладки"

    argument :url, String,
             required: true,
             description: "URL закладки"
  end
end 