"""Make engine environment to many to many

Revision ID: 3ff3ad7e4669
Revises: b67a78f26e73
Create Date: 2020-09-03 21:05:00.373952

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = "3ff3ad7e4669"
down_revision = "b67a78f26e73"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "query_engine_environment",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("query_engine_id", sa.Integer(), nullable=False),
        sa.Column("environment_id", sa.Integer(), nullable=False),
        sa.Column("engine_order", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["environment_id"], ["environment.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["query_engine_id"], ["query_engine.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "query_engine_id", "environment_id", name="unique_query_engine_environment"
        ),
    )
    op.execute(
        """
INSERT INTO
  query_engine_environment (query_engine_id, environment_id, engine_order)
SELECT
  a.id,
  a.environment_id,
  COUNT(b.id) + 1 AS engine_order
FROM
  query_engine AS a
  LEFT JOIN query_engine AS b ON a.id > b.id
  AND a.environment_id = b.environment_id
GROUP BY
  a.id,
  a.environment_id
ORDER BY
  a.environment_id
    """
    )

    op.drop_constraint("query_engine_ibfk_1", "query_engine", type_="foreignkey")
    op.drop_column("query_engine", "environment_id")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###

    op.add_column(
        "query_engine",
        sa.Column(
            "environment_id",
            mysql.INTEGER(display_width=11),
            autoincrement=False,
            nullable=False,
        ),
    )
    op.execute(
        """
UPDATE
  query_engine qe
  JOIN query_engine_environment qee ON qe.id = qee.query_engine_id
SET
  qe.environment_id = qee.environment_id
"""
    )
    op.create_foreign_key(
        "query_engine_ibfk_1",
        "query_engine",
        "environment",
        ["environment_id"],
        ["id"],
        ondelete="CASCADE",
    )

    op.drop_table("query_engine_environment")
    # ### end Alembic commands ###
