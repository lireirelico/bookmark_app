# app/graphql/types/query_type.rb
module Types
  class QueryType < Types::BaseObject
    description "Корневой тип для всех запросов GraphQL API"

    field :bookmarks, [Types::BookmarkType],
          null: false,
          description: "Список всех закладок"

    def bookmarks
      Bookmark.all
    end
  end
end
