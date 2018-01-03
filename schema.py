import graphene


class Stock(graphene.ObjectType):
    symbol = graphene.String()
    price = graphene.Float()


class Query(graphene.ObjectType):
    stocks = graphene.List(Stock)

    def resolve_stocks(self, info):
        return STOCKS


STOCKS = [
    Stock(symbol='AAPL', price=60.50),
    Stock(symbol='GOOG', price=60.51),
]

schema = graphene.Schema(query=Query)
