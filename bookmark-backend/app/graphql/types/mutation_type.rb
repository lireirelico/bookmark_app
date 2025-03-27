module Types
  class MutationType < Types::BaseObject
    description "Корневой тип для всех мутаций GraphQL API"

    field :create_bookmark, mutation: Mutations::CreateBookmark,
                            description: "Создать новую закладку"

    field :delete_bookmark, mutation: Mutations::DeleteBookmark,
                            description: "Удалить существующую закладку"

    field :update_bookmark, mutation: Mutations::UpdateBookmark,
                            description: "Обновить существующую закладку"
  end
end
