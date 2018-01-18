import graphene

from create_securities import SECURITIES


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

    def resolve_pldays(self, info):
        return [PLDay(**attrs) for attrs in self.pldays]

    def resolve_market_value(self, info):
        return self.price * self.quantity

    def resolve_cost_basis(self, info):
        return self.original_price * self.quantity

    def resolve_profit_loss(self, info):
        return self.resolve_market_value(info) - self.resolve_cost_basis(info)


security_models = [Security(**attrs) for attrs in SECURITIES.values()]

class Query(graphene.ObjectType):
    securities = graphene.List(Security)
    security = graphene.Field(Security, id=graphene.ID())
    hello = graphene.String()

    def resolve_securities(self, info):
        return security_models
    def resolve_security(self, info, id):
        if id in SECURITIES:
            return Security(**SECURITIES[id])

    def resolve_hello(self, info):
        return "Hello Ryan"


schema = graphene.Schema(query=Query)
