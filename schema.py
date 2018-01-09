import graphene

from create_securities import SECURITIES


class Stock(graphene.Interface):
    symbol = graphene.String()
    quantity = graphene.Float()
    cost_basis = graphene.Float()


class Position(graphene.ObjectType):
    class Meta:
        interfaces = (Stock, )

    acquired = graphene.String()
    original_price = graphene.Float()
    price = graphene.Float()
    market_value = graphene.Float()

    def resolve_market_value(self, info):
        return self.price * self.quantity

    def resolve_cost_basis(self, info):
        return self.original_price * self.quantity


class Security(graphene.ObjectType):
    class Meta:
        interfaces = (Stock, )

    id = graphene.ID()
    positions = graphene.List(Position)
    market_value = graphene.Float()
    price = graphene.Float()

    def resolve_positions(self, info):
        return [Position(**attrs) for attrs in self.positions]

    def resolve_market_value(self, info):
        return self.price * self.quantity


security_models = [Security(**attrs) for attrs in SECURITIES]

class Query(graphene.ObjectType):
    securities = graphene.List(Security)
    security = graphene.Field(Security, id=graphene.ID())
    hello = graphene.String()

    def resolve_securities(self, info):
        return security_models
    def resolve_security(self, info, id):
        return Security(**SECURITIES[int(id)])

    def resolve_hello(self, info):
        return "Hello Ryan"


schema = graphene.Schema(query=Query)
