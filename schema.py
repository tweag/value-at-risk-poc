import graphene

from create_securities import SECURITIES, BOOKS, BOOK_INDEX, REGIONS, REGION_INDEX


class PLDay(graphene.ObjectType):
    date = graphene.String()
    profit_loss = graphene.String()


class Security(graphene.ObjectType):
    id = graphene.ID()
    book = graphene.String()
    region = graphene.String()
    symbol = graphene.String()
    quantity = graphene.Float()
    original_price = graphene.Float()
    price = graphene.Float()
    cost_basis = graphene.Float()
    market_value = graphene.Float()
    profit_loss = graphene.Float()
    pldays = graphene.List(PLDay)
    value_at_risk = graphene.Float()

    def resolve_pldays(self, info):
        return [PLDay(**attrs) for attrs in self.pldays]

    def resolve_market_value(self, info):
        return self.price * self.quantity

    def resolve_cost_basis(self, info):
        return self.original_price * self.quantity

    def resolve_profit_loss(self, info):
        return self.resolve_market_value(info) - self.resolve_cost_basis(info)


security_models = [Security(**attrs) for attrs in SECURITIES.values()]

class Book(graphene.ObjectType):
    name = graphene.String()
    securities = graphene.List(Security)

    def resolve_securities(self, info):
        security_ids = BOOK_INDEX[self.name]
        return [s for s in security_models if s.id in security_ids]


class Region(graphene.ObjectType):
    name = graphene.String()
    securities = graphene.List(Security)

    def resolve_securities(self, info):
        security_ids = REGION_INDEX[self.name]
        return [s for s in security_models if s.id in security_ids]


class Query(graphene.ObjectType):
    securities = graphene.List(Security)
    security = graphene.Field(Security, id=graphene.ID())
    books = graphene.List(Book)
    regions = graphene.List(Region)
    hello = graphene.String()

    def resolve_securities(self, info):
        return security_models

    def resolve_security(self, info, id):
        if id in SECURITIES:
            return Security(**SECURITIES[id])

    def resolve_books(self, info):
        return [Book(name=book) for book in BOOKS]

    def resolve_regions(self, info):
        return [Region(name=region) for region in REGIONS]

    def resolve_hello(self, info):
        return "Hello Ryan"


schema = graphene.Schema(query=Query)
