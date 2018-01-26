import graphene

from create_securities import (
    calc_cost_basis, calc_market_value, calc_profit_loss,
    calc_value_at_risk_securities,
    SECURITIES, BOOKS, BOOK_INDEX, REGIONS, REGION_INDEX
)


class PLDay(graphene.ObjectType):
    date = graphene.String()
    profit_loss = graphene.String()
    profit_loss_value = graphene.String()


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
    value_at_risk_5 = graphene.Float()
    value_at_risk_1 = graphene.Float()

    def resolve_pldays(self, info):
        return [PLDay(**attrs) for attrs in self.pldays]

    def resolve_market_value(self, info):
        return self.price * self.quantity

    def resolve_cost_basis(self, info):
        return self.original_price * self.quantity

    def resolve_profit_loss(self, info):
        return self.resolve_market_value(info) - self.resolve_cost_basis(info)


security_models = [Security(**attrs) for attrs in SECURITIES.values()]


class SecurityGroup(graphene.AbstractType):
    securities = graphene.List(Security)
    cost_basis = graphene.Float()
    market_value = graphene.Float()
    profit_loss = graphene.Float()
    value_at_risk_1 = graphene.Float()
    value_at_risk_5 = graphene.Float()

    def resolve_cost_basis(self, info):
        return calc_cost_basis(self.security_ids())

    def resolve_market_value(self, info):
        return calc_market_value(self.security_ids())

    def resolve_profit_loss(self, info):
        return calc_profit_loss(self.security_ids())

    def resolve_securities(self, info):
        security_ids = self.security_ids()
        return [s for s in security_models if s.id in security_ids]

    def resolve_value_at_risk_1(self, info):
        return calc_value_at_risk_securities(self.security_ids(),  0.01)

    def resolve_value_at_risk_5(self, info):
        return calc_value_at_risk_securities(self.security_ids(),  0.05)


class BookRegion(graphene.ObjectType, SecurityGroup):
    region_name = graphene.String()
    book_name = graphene.String()
    name = graphene.String()

    def security_ids(self):
        return set(BOOK_INDEX[self.book_name]).intersection(REGION_INDEX[self.region_name])


class Book(graphene.ObjectType, SecurityGroup):
    name = graphene.String()
    regions = graphene.List(BookRegion)
    region = graphene.Field(lambda: Region, name=graphene.String())

    def security_ids(self):
        return BOOK_INDEX[self.name]

    def resolve_regions(self, info):
        securities = [s for s in security_models if s.id in self.security_ids()]
        region_names = set([s.region for s in securities])
        return [BookRegion(name=region_name, book_name=self.name, region_name=region_name) for region_name in region_names]

    def resolve_region(self, info, name):
        return BookRegion(name=name, book_name=self.name, region_name=name)


class Region(graphene.ObjectType, SecurityGroup):
    name = graphene.String()
    books = graphene.List(BookRegion)
    book = graphene.Field(Book, name=graphene.String())

    def security_ids(self):
        return REGION_INDEX[self.name]

    def resolve_books(self, info):
        securities = [s for s in security_models if s.id in self.security_ids()]
        book_names = set([s.book for s in securities])
        return [BookRegion(name=book_name, region_name=self.name, book_name=book_name) for book_name in book_names]

    def resolve_book(self, info, name):
        return BookRegion(name=name, book_name=name, region_name=self.name)


class Query(graphene.ObjectType):
    securities = graphene.List(Security)
    security = graphene.Field(Security, id=graphene.ID())
    books = graphene.List(Book)
    book = graphene.Field(Book, name=graphene.String())
    regions = graphene.List(Region)
    region = graphene.Field(Region, name=graphene.String())
    hello = graphene.String()

    def resolve_securities(self, info):
        return security_models

    def resolve_security(self, info, id):
        if id in SECURITIES:
            return Security(**SECURITIES[id])

    def resolve_books(self, info):
        return [Book(name=book) for book in BOOKS]

    def resolve_book(self, info, name):
        return Book(name=name)

    def resolve_regions(self, info):
        return [Region(name=region) for region in REGIONS]

    def resolve_region(self, info, name):
        return Region(name=name)

    def resolve_hello(self, info):
        return "Hello Ryan"


schema = graphene.Schema(query=Query)
