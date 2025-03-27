# app/graphql/types/bookmark_type.rb
module Types
  class BookmarkType < Types::BaseObject
    description "Тип, представляющий закладку"

    field :id, ID, null: false,
                   description: "Уникальный идентификатор закладки"

    field :title, String, null: false,
                          description: "Заголовок закладки"

    field :url, String, null: false,
                        description: "URL закладки"

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false,
                                                        description: "Дата создания закладки"
  end
end
