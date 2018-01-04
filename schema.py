import graphene

from create_securities import SECURITIES


class Stock(graphene.Interface):
    symbol = graphene.String()
    quantity = graphene.Float()
    market_value = graphene.Float()
    original_price = graphene.Float()
    cost_basis = graphene.Float()


class Position(graphene.ObjectType):
    class Meta:
        interfaces = (Stock, )

    aquired = graphene.String()

    def resolve_market_value(self, info):
        return self.price * self.quantity

    def resolve_cost_basis(self, info):
        return self.original_price * self.quantity


class Security(graphene.ObjectType):
    class Meta:
        interfaces = (Stock, )

    id = graphene.Int()
    positions = graphene.List(Position)
    price = graphene.Float()

    def resolve_positions(self, info):
        return [Position(**attrs) for attrs in self.positions]

    def resolve_market_value(self, info):
        return self.price * self.quantity

    def resolve_cost_basis(self, info):
        return self.original_price * self.quantity


class Query(graphene.ObjectType):
    securities = graphene.List(Security)
    hello = graphene.String()

    def resolve_securities(self, info):
        return [Security(**attrs) for attrs in SECURITIES]

    def resolve_hello(self, info):
        return "Hello Ryan"


schema = graphene.Schema(query=Query)
