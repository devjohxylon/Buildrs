"""Initial migration

Revision ID: 1
Create Date: 2025-07-22

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '1'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        'waitlist_entries',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )
    op.create_index(op.f('ix_waitlist_entries_email'), 'waitlist_entries', ['email'], unique=True)
    op.create_index(op.f('ix_waitlist_entries_id'), 'waitlist_entries', ['id'], unique=False)

def downgrade() -> None:
    op.drop_index(op.f('ix_waitlist_entries_id'), table_name='waitlist_entries')
    op.drop_index(op.f('ix_waitlist_entries_email'), table_name='waitlist_entries')
    op.drop_table('waitlist_entries') 